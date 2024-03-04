import { google } from "googleapis";

export async function GET() {
  try {
    const auth = await google.auth.getClient({
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID; 
    const range = "Master!A:F";

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return new Response(JSON.stringify({ message: "No data found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const cards = rows.slice(1).map((row) => ({
      name: row[0],
      url: row[1],
      image: row[2],
      originalPrice: row[3],
      discountPrice: row[4],
      updateDate: row[5],
    }));

    return new Response(JSON.stringify(cards), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
