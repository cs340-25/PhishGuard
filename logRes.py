#!pip install pandas
#!pip install scikit-learn
#!pip install numpy

#install if you havent already

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, f1_score, precision_score
# CEAS_08 csv from kaggle/github
# Nazario csv from kaggle/github
# Nigerian Fraud csv from kaggle/github
# Spam Assasin csv from kaggle/github
urls = [
    "https://raw.githubusercontent.com/rokibulroni/Phishing-Email-Dataset/refs/heads/main/CEAS_08.csv",
    "https://raw.githubusercontent.com/rokibulroni/Phishing-Email-Dataset/refs/heads/main/Nazario.csv",
    "https://raw.githubusercontent.com/rokibulroni/Phishing-Email-Dataset/refs/heads/main/Nigerian_Fraud.csv",
    "https://github.com/rokibulroni/Phishing-Email-Dataset/raw/refs/heads/main/SpamAssasin.csv"
]


data = pd.concat([pd.read_csv(url) for url in urls], ignore_index=True)

print(data.head())


# now we want to train a logistic regression model on this data through tokenization in order to throw metadata
#  from emails at it and allow it to parse that data and return whether or not an email may be phishing