echo fs.inotify.max_user_watches=100000 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
