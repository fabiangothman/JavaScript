# NWO Website

## Deployments

Commits to test branch deploy to test env.

Commits to production branch deploy to production env. 


## Local development
### Create local environment config file from dist

`cp .env.dist .env`

### 1. Install dependencies
```bash
$ yarn install
```

### 2. Run in next.js dev mode
```bash
$ yarn dev
```

### 3. Build for production and launch server
```
$ yarn build
$ yarn start
```

### 4. Build and export to static HTML
```
$ yarn export
```

For detailed explanation on how things work, check out [Next.js docs](https://nextjs.org/).

### 5. FFMPEG settings for compress animation
```
ffmpeg -i main_D.mp4  -c:v libx264 -pix_fmt yuv420p -profile:v high -level 4.0 -crf 20 -preset veryslow -vf scale=1920:-2 -an -movflags +faststart -threads 0 out/out6.mp4
```

### 6. Add/Update blog post

#### 1. Update copy, url and image (name and size) in ```src/data/blog.js```
#### 2. Place image into ```src/assets/images/blog/``` 
  image params: ratio: 1.424 (w: 2952px, h: 2073px), 3x, jpg
#### 3. Build and export to static HTML
```
$ yarn export
```
