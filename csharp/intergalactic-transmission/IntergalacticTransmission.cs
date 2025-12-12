using System.Text;

public static class IntergalacticTransmission
{
    public static byte[] GetTransmitSequence(byte[] message)
    {
        if (message.Length == 0 || message == null) return [];

        var messageBinaryBuilder = new StringBuilder();
        foreach(byte byteNum in message) 
            messageBinaryBuilder.Append(Convert.ToString(byteNum, 2).PadLeft(8, '0'));

        string messageBinary = messageBinaryBuilder.ToString();
        int encodedBytesCount = (messageBinary.Length % 7 == 0) 
            ? messageBinary.Length / 7
            : messageBinary.Length / 7 + 1;
        
        byte[] encodedBytes = new byte[encodedBytesCount];
        for(int i = 0; i < encodedBytesCount; i++)
        {
            string sevenBits = (7 * i + 6 < messageBinaryBuilder.Length)
                ? messageBinary.Substring(7 * i, 7)
                : messageBinary.Substring(7 * i);

            int onesCount = 0;
            foreach(char bit in sevenBits)
                if (bit == '1') onesCount++;
            
            string newByte = (onesCount % 2 == 0)
                ? $"{sevenBits.PadRight(7, '0')}0"
                : $"{sevenBits.PadRight(7, '0')}1";
            encodedBytes[i] = Convert.ToByte(newByte, 2);
        }
        return encodedBytes;
    }

    public static byte[] DecodeSequence(byte[] receivedSeq)
    {
        if (receivedSeq.Length == 0 || receivedSeq == null) return [];

        var receivedBinaryBuilder = new StringBuilder();
        foreach(byte byteNum in receivedSeq)
            receivedBinaryBuilder.Append(Convert.ToString(byteNum, 2).PadLeft(8, '0'));
        
        string receivedBinary = receivedBinaryBuilder.ToString();
        int decodedBytesCount = (receivedBinary.Length - receivedSeq.Length) / 8;
        int extraZeroes = (receivedBinary.Length - receivedSeq.Length) % 8;  

        var decodedBinaryBuilder = new StringBuilder();
        for (int i = 0; i < receivedSeq.Length; i++)
        {
            string encodedByte = receivedBinary.Substring(8 * i, 8);

            int onesCount = 0;
            for (int j = 0; j <= 6; j++)
                if (encodedByte[j] == '1') onesCount++;
            
            if ((onesCount % 2) != (int)Char.GetNumericValue(encodedByte[7]))
                throw new ArgumentException();
            
            decodedBinaryBuilder.Append(encodedByte.Substring(0, 7));
        }

        decodedBinaryBuilder.Remove(decodedBinaryBuilder.Length - extraZeroes, extraZeroes);
        string decodedBinary = decodedBinaryBuilder.ToString();
        byte[] decodedBytes = new byte[decodedBytesCount];
        for (int i = 0; i < decodedBytesCount; i++)
            decodedBytes[i] = Convert.ToByte(decodedBinary.Substring(8 * i, 8), 2);

        return decodedBytes;
    }
}
