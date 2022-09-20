# Backgroundd - simple wallpaper rotator for ChromeOS

This little extension sets your ChromeOS wallpaper to an image downloaded from a configurable URL in every 60 minutes (configurable too). The actual rotation is the job of the service listening on the URL, by default https://spotwall.azurewebsites.net/ is configured, but I encourage to use your own, so that my free plan won't be exhausted.

I added a little python script to the repository, this serves random images from the directory it was started in, you can run it in Crostini, or on a different computer.

The minimum rotation interval is 5 minutes.