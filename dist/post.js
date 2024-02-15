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
        core_1.default.warning(`Could not find Odin path at "${odinPath}"`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wb3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsZ0VBQWtDO0FBR2xDLHlEQUFpQztBQUVqQyxLQUFLLFVBQVUsSUFBSTtJQUNmLE1BQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDO1FBQ0QsTUFBTSxrQkFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQUMsV0FBTSxDQUFDO1FBQ0wsY0FBSSxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUMxRCxPQUFPO0lBQ1gsQ0FBQztJQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sa0JBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO1FBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLFFBQVEscUJBQXFCLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBQ0QsTUFBTSxrQkFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFFRCxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFVLEVBQUUsRUFBRTtJQUN4QixjQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNoQyxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLS0gTm9kZUpTXG5pbXBvcnQgZnMgZnJvbSAnbm9kZTpmcy9wcm9taXNlcyc7XG5cbi8vLS0gTlBNIFBhY2thZ2VzXG5pbXBvcnQgY29yZSBmcm9tICdAYWN0aW9ucy9jb3JlJztcblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBvZGluUGF0aCA9IGNvcmUuZ2V0U3RhdGUoJ29kaW4tcGF0aCcpO1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGZzLmFjY2VzcyhvZGluUGF0aCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIGNvcmUud2FybmluZyhgQ291bGQgbm90IGZpbmQgT2RpbiBwYXRoIGF0IFwiJHtvZGluUGF0aH1cImApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHN0YXQgPSBhd2FpdCBmcy5zdGF0KG9kaW5QYXRoKTtcbiAgICBpZiAoIXN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCByZW1vdmUgXCIke29kaW5QYXRofVwiIChub3QgYSBkaXJlY3RvcnkpYCk7XG4gICAgfVxuICAgIGF3YWl0IGZzLnJtKG9kaW5QYXRoLCB7cmVjdXJzaXZlOiB0cnVlLCBmb3JjZTogdHJ1ZX0pO1xufVxuXG5tYWluKCkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICBjb3JlLnNldEZhaWxlZChlcnIubWVzc2FnZSk7XG59KTtcbiJdfQ==