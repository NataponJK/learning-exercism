using System.Collections.Immutable;
using System.Reactive;
using System.Reactive.Linq;
using System.Reactive.Subjects;

public class HangmanState
{
    public string MaskedWord { get; }
    public ImmutableHashSet<char> GuessedChars { get; }
    public int RemainingGuesses { get; }

    public HangmanState(string maskedWord, ImmutableHashSet<char> guessedChars, int remainingGuesses)
    {
        MaskedWord = maskedWord;
        GuessedChars = guessedChars;
        RemainingGuesses = remainingGuesses;
    }
}

public class TooManyGuessesException : Exception { }

public class Hangman
{
    private readonly string _word;
    private readonly BehaviorSubject<HangmanState> _subject;
    private readonly IObserver<char> _guessObserver;
    private int _remainGuess = 9;
    private readonly HashSet<char> _guessChars = [];  
    public IObservable<HangmanState> StateObservable
    => _subject;
    public IObserver<char> GuessObserver 
    => _guessObserver; 
    public Hangman(string word)
    {
        _word = word;
        _subject = new BehaviorSubject<HangmanState>(ImmutableState);
        _guessObserver =Observer.Create<char>(Guess);
    }
    private void Guess(char value)
    {
        if (_remainGuess <= 0)
        {
            _subject.OnError(new TooManyGuessesException());
            return;
        }
        if (!_guessChars.Add(value) || !_word.Contains(value))
        {
            _remainGuess--;
        }
        else if (_word.All(c => _guessChars.Contains(c)))
        {
            _subject.OnCompleted();
            return;
        }
        _subject.OnNext(ImmutableState);
    }
    private HangmanState ImmutableState
    => new(maskedWord: new string(_word.Select(c => _guessChars.Contains(c) ? c : '_').ToArray()), 
           guessedChars: _guessChars.ToImmutableHashSet(), 
           remainingGuesses: _remainGuess);
}
