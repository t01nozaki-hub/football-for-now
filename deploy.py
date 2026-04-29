import ftplib
import os

FTP_HOST = os.environ.get("FTP_SERVER", "xs578979.xsrv.jp")
FTP_USER = os.environ.get("FTP_USERNAME", "xs578979")
FTP_PASS = os.environ.get("FTP_PASSWORD", "ntp6ed0i")
REMOTE_DIR = "footballfornow.com/public_html"
LOCAL_DIR = "out"

def upload_dir(ftp, local_path_base, remote_path_base):
    for root, dirs, files in os.walk(local_path_base):
        # Determine the relative path from the base local directory
        rel_path = os.path.relpath(root, local_path_base)
        if rel_path == '.':
            rel_path = ''
            
        # Create directories on FTP
        for d in dirs:
            remote_dir_path = os.path.join(remote_path_base, rel_path, d).replace('\\', '/')
            try:
                ftp.mkd(remote_dir_path)
                print(f"Created directory {remote_dir_path}")
            except ftplib.error_perm as e:
                pass  # Ignore if it already exists
        
        # Upload files
        for f in files:
            local_file_path = os.path.join(root, f)
            remote_file_path = os.path.join(remote_path_base, rel_path, f).replace('\\', '/')
            print(f"Uploading {local_file_path} to {remote_file_path}")
            with open(local_file_path, "rb") as file_obj:
                ftp.storbinary(f"STOR {remote_file_path}", file_obj)

def main():
    print(f"Connecting to {FTP_HOST}...")
    try:
        with ftplib.FTP(FTP_HOST, FTP_USER, FTP_PASS) as ftp:
            print("Connected successfully. Starting upload...")
            upload_dir(ftp, LOCAL_DIR, REMOTE_DIR)
            print("Upload completed successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
