"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("node:fs/promises"));
const core_1 = __importDefault(require("@actions/core"));
async function main() {
    const odinPath = core_1.default.getState('odin-path');
    try {
        await promises_1.default.access(odinPath);
    }
    catch (_a) {
        core_1.default.warning(`Could not access Odin path at "${odinPath}"`);
        return;
    }
    const stat = await promises_1.default.stat(odinPath);
    if (!stat.isDirectory()) {
        throw new Error(`Cannot remove "${odinPath}" (not a directory)`);
    }
    await promises_1.default.rm(odinPath, { recursive: true, force: true });
}
main().catch((err) => {
    core_1.default.setFailed(err.message);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wb3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsZ0VBQWtDO0FBR2xDLHlEQUFpQztBQUVqQyxLQUFLLFVBQVUsSUFBSTtJQUNmLE1BQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDO1FBQ0QsTUFBTSxrQkFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQUMsV0FBTSxDQUFDO1FBQ0wsY0FBSSxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUM1RCxPQUFPO0lBQ1gsQ0FBQztJQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sa0JBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO1FBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLFFBQVEscUJBQXFCLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBQ0QsTUFBTSxrQkFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFFRCxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFVLEVBQUUsRUFBRTtJQUN4QixjQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNoQyxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLS0gTm9kZUpTXG5pbXBvcnQgZnMgZnJvbSAnbm9kZTpmcy9wcm9taXNlcyc7XG5cbi8vLS0gTlBNIFBhY2thZ2VzXG5pbXBvcnQgY29yZSBmcm9tICdAYWN0aW9ucy9jb3JlJztcblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBvZGluUGF0aCA9IGNvcmUuZ2V0U3RhdGUoJ29kaW4tcGF0aCcpO1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGZzLmFjY2VzcyhvZGluUGF0aCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIGNvcmUud2FybmluZyhgQ291bGQgbm90IGFjY2VzcyBPZGluIHBhdGggYXQgXCIke29kaW5QYXRofVwiYCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc3RhdCA9IGF3YWl0IGZzLnN0YXQob2RpblBhdGgpO1xuICAgIGlmICghc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IHJlbW92ZSBcIiR7b2RpblBhdGh9XCIgKG5vdCBhIGRpcmVjdG9yeSlgKTtcbiAgICB9XG4gICAgYXdhaXQgZnMucm0ob2RpblBhdGgsIHtyZWN1cnNpdmU6IHRydWUsIGZvcmNlOiB0cnVlfSk7XG59XG5cbm1haW4oKS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgIGNvcmUuc2V0RmFpbGVkKGVyci5tZXNzYWdlKTtcbn0pO1xuIl19