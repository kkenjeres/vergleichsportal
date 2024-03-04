import { google } from "googleapis";

export async function GET(req) {
  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const id = searchParams.get("id");

  try {
    const auth = await google.auth.getClient({
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = "Master!A:H";

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

    let dataToSend;
    if (id) {
      const rowIndex = parseInt(id, 10) - 1;
      const productData = rows[rowIndex + 1];
      if (!productData) {
        return new Response(JSON.stringify({ message: "Product not found" }), {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      dataToSend = {
        id,
        name: productData[0],
        url: productData[2],
        image: productData[3],
        originalPrice: productData[4],
        discountPrice: productData[5],
        updateDate: productData[6],
      };
    } else {
      dataToSend = rows.slice(1).map((row, index) => ({
        id: index + 1,
        name: row[0],
        url: row[2],
        image: row[3],
        originalPrice: row[4],
        discountPrice: row[5],
        updateDate: row[6],
      }));
    }

    return new Response(JSON.stringify(dataToSend), {
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
