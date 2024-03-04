import { google } from "googleapis";

export async function fetchSheetData() {
  try {
    const auth = await google.auth.getClient({
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const range = "Master!A:F";
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      throw new Error("No data found.");
    }

    const cards = rows.slice(1).map((row) => ({
      name: row[0],
      url: row[1],
      image: row[2],
      originalPrice: row[3],
      discountPrice: row[4],
      updateDate: row[5],
    }));

    return cards;
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    throw error;
  }
}
