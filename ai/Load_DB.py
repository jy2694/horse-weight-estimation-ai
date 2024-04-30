import mariadb
import sys


class LoadDB:
    try:
        conn = mariadb.connect(host='localhost', user='root', password='1234', port=3306, database='cephalometricai')
        print('Connection successful')
    except mariadb.Error as e:
        print(f'Error connecting to MariaDB Platform: {e}')
        sys.exit(1)

    cur = conn.cursor()

    select_query = "SELECT system_path from image WHERE id=?"

    @classmethod
    def get_filepath(cls, id):
        cls.cur.execute(cls.select_query, (id,))
        result_set = cls.cur.fetchall()

        return result_set[0][0]
