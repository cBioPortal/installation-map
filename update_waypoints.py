import os.path

from google.auth.transport.requests import Request
from google.oauth2 import service_account
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import googlemaps
import pandas as pd
from enum import Enum

# Google Sheets API
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

# The ID and range of a spreadsheet.
SPREADSHEET_ID = os.getenv("SPREADSHEET_ID")
RANGE = "A:T"
FILTER_BY_COL_IDX = [0,5,8,9,10,19]

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

    # Convert to pandas dataframe
    df = pd.DataFrame(values[1:], columns=values[0], dtype=str).fillna("")

    return df

# Get raw geocode given city, state, and country
def get_raw_geocode(city, state, country):
    gmaps = googlemaps.Client(key=GEOCODING_API_KEY)
    geocode_result = gmaps.geocode("%s %s %s" % (city, state, country))
    if not geocode_result:
        geocode_result = gmaps.geocode("%s %s" % (state, country))
    if not geocode_result:
        geocode_result = gmaps.geocode(country)
    if not geocode_result:
        return None
    
    return geocode_result

# Parse geocode and return address, longitude, latitude
def parse_geocode(raw_geocode):
    formatted_address = raw_geocode[0]["formatted_address"]
    location = raw_geocode[0]["geometry"]["location"]
    lng, lat = location["lng"], location["lat"]
    return formatted_address, lng, lat

def main():
    creds = service_account.Credentials.from_service_account_file(GOOGLE_SERVICE_ACCOUNT, scopes=SCOPES)
    df = spreadsheet_to_pandas(creds).fillna("")
    df_approved = df[df[df.columns[0]].str.strip().str.lower() == "yes"]
    
    print("Geocoding waypoints...")
    geocode_waypoints = []
    for index, row in df_approved.iterrows():
        curr_waypoint = [row.iloc[col] for col in FILTER_BY_COL_IDX]
        curr_geocode = geocode(curr_waypoint[2], curr_waypoint[3], curr_waypoint[4])
        
        address, lng, lat = parse_geocode(curr_geocode)
        print(curr_geocode)
        print(address, lng, lat)
        return

if __name__ == "__main__":
  main()