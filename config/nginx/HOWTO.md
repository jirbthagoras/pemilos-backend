# Panduan config nginx

## Prerequisites
- Diharapkan anda menggunakan vm ubuntu 20-24
- sudah terinstall nginx

## Basic Knowledge
- root folder dari nginx ada di `/etc/nginx`
- untuk mengaktifkan site di nginx kita harus membuat vhost di `/etc/nginx/sites-enabled`
- untuk mengecek apakah config nginx kita sudah benar, bisa menggunakan command `sudo nginx -t`
- untuk load config baru pada nginx, nginx harus di restart dengan command `sudo nginx -s reload`

## Steps
- di dalam folder `/etc/nginx/sites-enabled` anda akan menemukan file `default` hiraukan file ini dan buatlah file baru `app` dan `grafana`
- copy isi file dari `app.conf` di repo ke file `app` di vm, lakukan juga untuk file `grafana`
- edit file `nginx.conf` pada folder root nginx di `/etc/nginx` sesuai dengan file `nginx.conf` yang ada di repo
- cek config dengan `sudo nginx -t` pastikan tidak ada salah pada config
- reload nginx dengan `sudo nginx -s reload`