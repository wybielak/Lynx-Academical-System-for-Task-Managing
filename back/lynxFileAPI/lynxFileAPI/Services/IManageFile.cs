namespace lynxFileAPI.Services
{
    public interface IManageFile
    {
        Task<String> UploadFile(IFormFile _IFormFile, string _SubjectName, string _StudentName, string _TaskName);
        Task<(byte[], string, string)> DownloadFile(string _SubjectName, string _StudentName, string _TaskName);
    }
}
