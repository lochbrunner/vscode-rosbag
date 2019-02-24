#!/usr/bin/python2

import rosbag
from rospy import Time

from std_msgs.msg import Int32, String

bag = rosbag.Bag('test.bag', 'w')


try:
    for it in range(0,10):
        s = String()
        s.data = 'foo-' + str(it)

        i = Int32()
        i.data = it

        bag.write('chatter', s, t=Time.from_seconds(it+0.3))
        bag.write('numbers', i, t=Time.from_seconds(it+0.5))
finally:
    bag.close()