module.exports = {
  apps: [{
    name: 'sophsmenu',
    script: 'npm',
    args: 'start',
    cwd: '/home/ec2-user/sophs-menu-prod',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/home/ec2-user/logs/err.log',
    out_file: '/home/ec2-user/logs/out.log',
    log_file: '/home/ec2-user/logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max_old_space_size=1024'
  }]
};
