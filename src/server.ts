import { serverHttp } from "./http";
import "./webSocket";



serverHttp.listen(4000,() => console.log('Server running... on port 4000'));
