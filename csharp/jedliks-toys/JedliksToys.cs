class RemoteControlCar
{
    private int _driveDistance = 0;
    private int _remainingBatery = 100;
    public static RemoteControlCar Buy()
    => new RemoteControlCar();

    public string DistanceDisplay()
    => $"Driven {_driveDistance} meters";

    public string BatteryDisplay()
    => _remainingBatery > 0 ? $"Battery at {_remainingBatery}%" : $"Battery empty";

    public void Drive()
    {
        if (_remainingBatery > 0) {
            _driveDistance += 20;
            _remainingBatery -= 1;
        }
    }
}
