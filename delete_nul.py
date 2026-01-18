import os
try:
    path = r"\\?\c:\Users\fuyad\Downloads\muchatrodol\nul"
    if os.path.exists(path):
        os.remove(path)
        print("Successfully deleted nul file")
    else:
        print("nul file not found")
except Exception as e:
    print(f"Error deleting nul file: {e}")
