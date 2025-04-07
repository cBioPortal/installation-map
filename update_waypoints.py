import os.path

from google.auth.transport.requests import Request
from google.oauth2 import service_account
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Google Sheets API
# If modifying these scopes, delete the file token.pickle.
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

# The ID and range of a spreadsheet.
SPREADSHEET_ID = os.getenv("SPREADSHEET_ID")
SHEET_NAME = 'Form Responses 1'
RANGES = ["A:A", "D:D", "F:F", "I:I", "K:K"]

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
        service.spreadsheets()
        .values()
        .get(spreadsheetId=SPREADSHEET_ID, range=SHEET_NAME)
        .execute()
    )
    values = result.get("values", [])

    # Create dataframe
    if not values:
        print("WARN: No data found.")
        df = pd.DataFrame()
    else:
        df = pd.DataFrame(values[1:], columns=values[0])

    return df

def main():
    creds = service_account.Credentials.from_service_account_file(GOOGLE_SERVICE_ACCOUNT, scopes=SCOPES)
    df = spreadsheet_to_pandas(creds)

    print(df.head())


if __name__ == "__main__":
  main()