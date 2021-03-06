<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Hello WebSocket</title>
</head>
<body>
    <div id="content"></div>
    <button onclick="sayHello()">打招呼</button>

    <script type="text/javascript">
        var webSocket =
            new WebSocket('ws://localhost:5555/soc/test');

        webSocket.onerror = function(event) {
            onError(event)
        };

        webSocket.onopen = function(event) {
            onOpen(event)
        };

        webSocket.onmessage = function(event) {
            onMessage(event)
        };

        function onMessage(event) {
            document.getElementById('content').innerHTML += '<br />服务器说：' + event.data;
        }

        function onOpen(event) {
            document.getElementById('content').innerHTML = '连接成功';
        }

        function onError(event) {
            document.getElementById('content').innerHTML = '出现错误';
        }

        function sayHello() {
            webSocket.send('hello');
            return false;
        }
    </script>
</body>
</html>