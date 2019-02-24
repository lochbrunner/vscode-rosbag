import {spawn} from 'child_process';

export async function load_content_rospy(
    ext_path: string, filename: string): Promise<string> {
  let store = '';
  return new Promise<string>((resolve, reject) => {
    const process = spawn(`${ext_path}/tools/read.py`, [filename]);

    process.stdout.on('data', data => {
      store += data.toString();
    });
    process.on('exit', (code) => {
      if (code === 0)
        resolve(store);
      else
        reject(`Loader ${
                         ext_path
                       }/tools/read.py on file ${
                                                 filename
                                               } exited with code ${code}`);
    });
  });
}

export async function get_rosbag_info(filename: string): Promise<string> {
  let store = '';
  return new Promise<string>((resolve, reject) => {
    const process = spawn('rosbag', ['info', filename]);

    process.stdout.on('data', data => {
      store += data.toString();
    });
    process.on('exit', (code) => {
      if (code === 0)
        resolve(store);
      else
        reject(`Could not run rosbag info on file ${
                                                    filename
                                                  } exited with code ${code}`);
    });
  });
}
