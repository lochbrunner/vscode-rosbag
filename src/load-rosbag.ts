import {spawn} from 'child_process';
// import rosbag from 'rosbag';

// export async function load_js() {
//   const bag = await rosbag.open('test.bag');
//   await bag.readMessages({topics: undefined}, (result) => {
//     console.log(result);
//   });
// }

export async function load_rospy(
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
