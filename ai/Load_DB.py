import mariadb
import sys


class LoadDB:
    def __init__(self):
        try:
            self.conn = mariadb.connect(host='localhost', user='root', password='000000', port=3306, database='test')
        except mariadb.Error as e:
            print(f'Error connecting to MariaDB Platform: {e}')
            sys.exit(1)

        self.cur = self.conn.cursor()

        self.select_query = "SELECT file_path from test_db WHERE id=?"

    def get_filepath(self, id):
        self.cur.execute(self.select_query, (id,))
        result_set = self.cur.fetchall()

        return result_set[0][0]


# test = LoadDB()
# print(test.get_filepath('e7af1426- 511d-11e8-a090-0201965f932a'))