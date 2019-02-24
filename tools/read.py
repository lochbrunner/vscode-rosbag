#!/usr/bin/python2

import rosbag
import argparse

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Reads the specified Rosbag')
    parser.add_argument('filename', metavar='N', type=str,
                    help='an integer for the accumulator')

    args = parser.parse_args()
    

    bag = rosbag.Bag(args.filename)
    for topic, msg, time in bag.read_messages():
        print str(time.to_time()).ljust(18) + topic
    bag.close()
