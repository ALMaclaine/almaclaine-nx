const httpResponse = (body: unknown, statusCode = 201) => {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
};

export { httpResponse };
