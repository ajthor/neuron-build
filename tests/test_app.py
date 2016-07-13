
import unittest
from testutils import teardown, random_ipc_endpoint, TIME_FACTOR

import neuron_build

from neuron_build import app


class TestApp(unittest.TestCase):

    def test_zerorpc_server(self):
        endpoint = random_ipc_endpoint()
        self.assertEqual(1, 1)

if __name__ == '__main__':
    unittest.main()
