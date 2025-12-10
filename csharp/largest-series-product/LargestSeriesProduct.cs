public static class LargestSeriesProduct
{
    public static long GetLargestProduct(string digits, int span) 
    {
        if (span < 0 || span > digits.Length) throw new ArgumentException();
        if (digits.Any(c => !char.IsDigit(c))) throw new ArgumentException();
        if (span == 0) return 1;

        long largestProduct = 0;
        for (int i = 0; i <= digits.Length - span ; i++)
        {
            long currentProduct = 1;
            for (int j = 0; j < span; j++) currentProduct *= (long)char.GetNumericValue(digits[i + j]);
            if (currentProduct> largestProduct) largestProduct = currentProduct;
        }
        return largestProduct;
    }
}