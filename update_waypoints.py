import os.path

from google.auth.transport.requests import Request
from google.oauth2 import service_account
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import pandas as pd

# Google Sheets API
# If modifying these scopes, delete the file token.pickle.
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

# The ID and range of a spreadsheet.
SPREADSHEET_ID = os.getenv("SPREADSHEET_ID")
RANGE = "A:K"

# Geocoding API
GEOCODING_API_KEY = os.getenv("GEOCODING_API_KEY")

# Google Service Account
GOOGLE_SERVICE_ACCOUNT = "credentials.json"

# Specified directory and file
SRC_DIR = "./src"
WAYPOINTS = "%s/waypoints.json" % SRC_DIR

# Get credentials from service account
def get_creds():
    return service_account.Credentials.from_service_account_file(GOOGLE_SERVICE_ACCOUNT, scopes=SCOPES)

# Read spreadsheet and return a pandas dataframe
def spreadsheet_to_pandas(creds):
    # Fetch values
    service = build("sheets", "v4", credentials=creds)
    sheet = service.spreadsheets()
    result = (
        sheet.values()
        .get(spreadsheetId=SPREADSHEET_ID, range=RANGE)
        .execute()
    )
    values = result.get("values", [])

    if not values:
        print("WARN: No data found.")
        return

    print("Approved:")
    for row in values:
        print(f"{row[0]}")    

def main():
    creds = service_account.Credentials.from_service_account_file(GOOGLE_SERVICE_ACCOUNT, scopes=SCOPES)
    spreadsheet_to_pandas(creds)

if __name__ == "__main__":
  main()