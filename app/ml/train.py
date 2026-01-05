from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
import pandas as pd

def is_classification_target(y: pd.Series, model_type: str) -> bool:
    # Logistic regression is always classification
    if model_type == "logistic":
        return True

    if pd.api.types.is_object_dtype(y) or pd.api.types.is_bool_dtype(y):
        return True
    return False


def get_model(model_type: str, target_series: pd.Series):
    if model_type == "linear":
        return LinearRegression()

    elif model_type == "logistic":
        return LogisticRegression(max_iter=1000)

    elif model_type == "tree":
        if is_classification_target(target_series, model_type):
            return DecisionTreeClassifier()
        else:
            return DecisionTreeRegressor()

    else:
        raise ValueError("Invalid model type")
