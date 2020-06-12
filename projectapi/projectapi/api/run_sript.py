import pyodbc

def getDetailsFromDB():
    server = 'final-project-415.database.windows.net'
    database = 'nba-data'
    username = 'admin415'
    password = '415@data'
    driver = 'ODBC Driver 17 for SQL Server'
    cnxn = pyodbc.connect('DRIVER='+driver+';SERVER='+server +
                          ';PORT=1433;DATABASE='+database+';UID='+username+';PWD=' + password)
    cursor = cnxn.cursor()
​
    cursor.execute(
        "SELECT * FROM Shot_Prediction")  # INSERT QUERY HERE
    row = cursor.fetchone()
    while row:
        for currentRow in row:
            print(currentRow, end='\t  ')
        print(row)
        row = cursor.fetchone()
​
​
getDetailsFromDB()