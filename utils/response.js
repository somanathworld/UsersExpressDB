export const successResponse = (res, data, message = "Success", status = 200) => {
  return res.status(status).json({ success: true, message, data });
};

export const errorResponse = (res, error, status = 500) => {
  console.error("API Error:", error);
  return res.status(status).json({ success: false, error: error.message || error });
};
