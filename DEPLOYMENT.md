# Deployment of EvalAI-ngx

To deploy the Project you need to have nodejs & npm installed.

1. Get the source code on to your machine via git.

    ```shell
    git clone https://github.com/Cloud-CV/EvalAI-ngx.git evalai-ngx && cd evalai-ngx
    ```

2. Install all the project requirements using npm.

    ```
    npm install
    ```

3. Build the project with ng. The artifacts will be stored in the `dist/` directory.
    ```
    ng build --prod
    ```

4. Copy the output from `dist` folder to a directory on your server.

5. Configure your webserver to redirect all requests to missing files to `index.html`. For nginx, this is done by adding the `try_files` directive:
    ```
    location / {
        try_files $uri $uri/ /index.html;
    }
    ```