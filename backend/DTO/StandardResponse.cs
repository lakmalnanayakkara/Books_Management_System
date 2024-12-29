namespace backend.DTO
{
    public class StandardResponse
    {
        public int statusCode {  get; set; }
        public string message { get; set; }
        public System.Object data { get; set; }

        public StandardResponse(int statusCode, string message, System.Object content)
        {
            statusCode = statusCode;
            message = message;
            data = content;
        }
    }
}
