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
COLS = "A:A F:M"

# Geocoding API
GEOCODING_API_KEY = os.getenv("GEOCODING_API_KEY")

# Google Service Account
GOOGLE_SERVICE_ACCOUNT = "credentials.json"

# Specified directory and file
SRC_DIR = "./src"
WAYPOINTS = "%s/waypoints.json" % SRC_DIR


def main():
  """Shows basic usage of the Sheets API.
  Prints values from a sample spreadsheet.
  """
  creds = service_account.Credentials.from_service_account_file(GOOGLE_SERVICE_ACCOUNT, scopes=SCOPES)

  try:
    service = build("sheets", "v4", credentials=creds)

    # Call the Sheets API
    sheet = service.spreadsheets()
    result = (
        sheet.values()
        .get(spreadsheetId=SPREADSHEET_ID, range=COLS)
        .execute()
    )
    values = result.get("values", [])

    if not values:
      print("No data found.")
      return

    for row in values:
      # Print columns A and E, which correspond to indices 0 and 4.
      print(f"{row[0]}, {row[4]}")
  except HttpError as err:
    print(err)


if __name__ == "__main__":
  main()