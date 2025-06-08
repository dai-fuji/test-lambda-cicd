/**
 * Lambda関数ハンドラー
 */
exports.lambdaHandler = async (event, context) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "こんにちは、世界！",
        timestamp: new Date().toISOString(),
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "エラーが発生しました",
        error: err.message,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};
