namespace lynxFileAPI.Services
{
    public interface IManageImage
    {
        Task<String> UploadFile(IFormFile _IFormFile);
        Task<(byte[], string, string)> DownloadFile(string FileName);
    }
}
