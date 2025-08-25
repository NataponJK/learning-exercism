public class SpiralMatrix
{
    public static int[,] GetMatrix(int size)
    {
        int[,] matrix = new int[size, size];
        int number = 1;
        int top = 0, bottom = size - 1;
        int left = 0, right = size - 1;
        while (top <= bottom && left <= right)
        {
            //Move Right
            for (int i = left; i <= right; i++)
            {
                matrix[top, i] = number++;
            }
            top++;
            //Move Down
            for (int i = top; i <= bottom; i++)
            {
                matrix[i, right] = number++;
            }
            right--;
            //Move Left
            if (top <= bottom)
            {
                for (int i = right; i >= left; i--)
                {
                    matrix[bottom, i] = number++;
                }
                bottom--;
            }
            //Move Up
            if (left <= right)
            {
                for (int i = bottom; i >= top; i--)
                {
                    matrix[i, left] = number++;
                }
                left++;
            }
        }
        return matrix;        
    }
}
