using System.Collections.Immutable;
using System.Reactive.Subjects;

public record GameState(string MaskedWord, ImmutableHashSet<char> GuessedChars, int RemainingGuesses);
public class TooManyGuessesException : Exception { }
public class SaveTheCow : IObserver<char>
{
    private GameState _state;
    private readonly string _word;
    private readonly BehaviorSubject<GameState> _subject;
    public bool IsGuessed => _state.MaskedWord == _word;
    public IObservable<GameState> StateObservable => _subject;
    public IObserver<char> GuessObserver => this;

    public SaveTheCow(string word)
    {
        _state = new GameState(MaskedWord: new string ('_', word.Length), GuessedChars: [], RemainingGuesses: 9);
        _word = word;
        _subject = new BehaviorSubject<GameState>(_state);
    }

    public void OnCompleted() { }
    public void OnError(Exception error) => throw new NotImplementedException("No requirement", error);
    public string UnmaskChar(char guessed, string masked) => string.Concat(_word.Zip(masked, (w, m) => w == guessed ? w : m));
    public void OnNext(char value)
    {
        if (_state.RemainingGuesses <= 0)
        {
            _subject.OnError(new TooManyGuessesException());
            return;
        }
        var newMask = UnmaskChar(value, _state.MaskedWord);
        var remainingGuesses = _state.RemainingGuesses;
        if (newMask == _state.MaskedWord) remainingGuesses--;
        _state = new GameState(newMask, _state.GuessedChars.Add(value), remainingGuesses);

        if (IsGuessed) _subject.OnCompleted();
        else _subject.OnNext(_state);
    }
}