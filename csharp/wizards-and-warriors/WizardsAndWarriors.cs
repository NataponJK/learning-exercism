abstract class Character
{
    private string characterType;
    protected Character(string characterType)
    => this.characterType = characterType;
    public abstract int DamagePoints(Character target);
    public virtual bool Vulnerable()
    => false;
    public override string ToString()
    => $"Character is a {this.characterType}";
}

class Warrior : Character
{
    public Warrior() : base("Warrior") { }
    public override int DamagePoints(Character target)
    => target.Vulnerable() ? 10 : 6;
}

class Wizard : Character
{
    private bool spellPreapred = false;
    public Wizard() : base("Wizard") {}
    public override bool Vulnerable()
    => !spellPreapred;

    public override int DamagePoints(Character target)
    => target.Vulnerable() ? 3 : 12;

    public void PrepareSpell()
    => spellPreapred = true;
}
