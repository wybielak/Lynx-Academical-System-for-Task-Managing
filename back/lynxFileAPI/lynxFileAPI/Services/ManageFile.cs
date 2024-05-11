using API.FileProcessing.Helper;
using Microsoft.AspNetCore.StaticFiles;
using System.IO.Compression;

namespace lynxFileAPI.Services
{
    public class ManageFile: IManageFile
    {
        public async Task<string> UploadFile(IFormFile _IFormFile, string _SubjectName, string _StudentName, string _TaskName)
        {
            string FileName = "";
            try
            {
                FileInfo _FileInfo = new FileInfo(_IFormFile.FileName);
                //FileName = _IFormFile.FileName + "_" + DateTime.Now.Ticks.ToString() + _FileInfo.Extension;
                
                FileName = _IFormFile.FileName;

                var _GetFilePath = Common.GetFilePath(FileName, _SubjectName, _StudentName, _TaskName);

                using (var _FileStream = new FileStream(_GetFilePath, FileMode.Create))
                {
                    await _IFormFile.CopyToAsync(_FileStream);
                }
                return FileName;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //public async Task<(byte[], string, string)> DownloadFile(string _SubjectName, string _StudentName, string _TaskName)
        //{
        //    try
        //    {
        //        var _GetFilePath = Common.GetDFilePath(_SubjectName, _SubjectName, _TaskName);
        //        var provider = new FileExtensionContentTypeProvider();
        //        if (!provider.TryGetContentType(_GetFilePath, out var _ContentType))
        //        {
        //            _ContentType = "application/octet-stream";
        //        }
        //        var _ReadAllBytesAsync = await File.ReadAllBytesAsync(_GetFilePath);
        //        return (_ReadAllBytesAsync, _ContentType, Path.GetFileName(_GetFilePath));
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        public async Task<(byte[], string, string)> DownloadFile(string _SubjectName, string _StudentName, string _TaskName)
        {
            try
            {
                var parentFolderPath = Common.GetDFilePath(_SubjectName, _StudentName, _TaskName);

                if (!Directory.Exists(parentFolderPath))
                {
                    throw new DirectoryNotFoundException($"Parent folder '{parentFolderPath}' not found.");
                }

                if (!Directory.Exists("toDownload\\"))
                {
                    Directory.CreateDirectory("toDownload\\");
                }

                var zipFilePath = Path.Combine("toDownload\\", $"{_SubjectName}_{_StudentName}_{_TaskName}.zip");

                if (File.Exists(zipFilePath))
                {
                    File.Delete(zipFilePath);
                }

                ZipFile.CreateFromDirectory(parentFolderPath, zipFilePath);

                var fileBytes = await File.ReadAllBytesAsync(zipFilePath);
                var contentType = "application/zip";
                var fileName = Path.GetFileName(zipFilePath);

                return (fileBytes, contentType, fileName);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
