public static class TelemetryBuffer
{
    public static byte[] ToBuffer(long reading)
    {
        byte[] buffer = new byte[9];

        if (reading >= short.MinValue && reading <= -1)
        {
            buffer[0] = 256 - 2; //254
            BitConverter.GetBytes((short)reading).CopyTo(buffer, 1);
        }
        else if (reading >= 0 && reading <= ushort.MaxValue)
        {
            buffer[0] = 2;
            BitConverter.GetBytes((ushort)reading).CopyTo(buffer, 1);
        }
        else if (reading >= int.MinValue && reading <= int.MaxValue)
        {
            buffer[0] = 256 - 4;//525
            BitConverter.GetBytes((int)reading).CopyTo(buffer, 1);
        }
        else if (reading >= uint.MinValue && reading <= uint.MaxValue)
        {
            buffer[0] = 4;
            BitConverter.GetBytes((uint)reading).CopyTo(buffer, 1);
        }
        else
        {
            buffer[0] = 256 - 8;//248
            BitConverter.GetBytes(reading).CopyTo(buffer, 1);
        }
        return buffer;
    }

    public static long FromBuffer(byte[] buffer)
    {
        if (buffer == null || buffer.Length != 9) return 0;

        byte prefix = buffer[0];

        try
        {
            return prefix switch
            {
                2 => BitConverter.ToUInt16(buffer, 1),
                4 => BitConverter.ToUInt32(buffer, 1),
                8 => BitConverter.ToInt64(buffer, 1),
                256 - 2 => BitConverter.ToInt16(buffer, 1),
                256 - 4 => BitConverter.ToInt32(buffer, 1),
                256 - 8 => BitConverter.ToInt64(buffer, 1),
                _ => 0
            };
        }
        catch
        {
            return 0;
        }
    }
}
