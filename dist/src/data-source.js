"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    type: 'sqlite',
    database: '.db/sql',
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
};
//# sourceMappingURL=data-source.js.map