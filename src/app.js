const axios = require("axios");

/**
 * Lambda関数ハンドラー
 */
exports.lambdaHandler = async (event, context) => {
  try {
    // GoogleにHTTPSリクエストを送信（axiosを使用）
    const googleResponse = await axios.get("https://www.google.com", {
      timeout: 5000, // 5秒でタイムアウト
      headers: {
        "User-Agent": "AWS Lambda Function",
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "こんにちは、フジモトさん！",
        timestamp: new Date().toISOString(),
        googleRequest: {
          success: true,
          statusCode: googleResponse.status,
          statusText: googleResponse.statusText,
          dataLength: googleResponse.data.length,
          contentType: googleResponse.headers["content-type"],
          responseTime: googleResponse.headers["date"],
        },
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (err) {
    console.log(err);

    // Axiosエラーの詳細情報を取得
    let errorDetails = {
      success: false,
      error: err.message,
    };

    if (err.response) {
      // サーバーからのレスポンスエラー
      errorDetails.statusCode = err.response.status;
      errorDetails.statusText = err.response.statusText;
    } else if (err.request) {
      // リクエストが送信されたがレスポンスがない
      errorDetails.type = "No response received";
    } else {
      // リクエスト設定エラー
      errorDetails.type = "Request setup error";
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "エラーが発生しました",
        error: err.message,
        googleRequest: errorDetails,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};
