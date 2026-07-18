# Blog

个人博客，基于 [Astro](https://astro.build/) 和 [AstroPaper](https://github.com/satnaing/astro-paper) 构建。

## 本地开发

```bash
pnpm install
pnpm dev
```

浏览器打开 `http://localhost:4321` 即可。

## 常用命令

| 命令 | 说明 |
| :--- | :--- |
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 构建生产版本到 `dist/` |
| `pnpm preview` | 本地预览构建结果 |
| `pnpm check` | 类型检查 |

## 部署

推送到 `main` 分支会自动触发 GitHub Actions 构建并部署到 GitHub Pages。

## License

[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
