from sklearn.metrics import mean_squared_error

def compute_mse(model, X, y):
    predictions = model.predict(X)
    return mean_squared_error(y, predictions)