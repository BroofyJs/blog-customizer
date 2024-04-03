import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [data, setData] = useState(defaultArticleState);

	const onSubmit = (params: ArticleStateType) => {
		setData(params);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': data.fontFamilyOption.value,
					'--font-size': data.fontSizeOption.value,
					'--font-color': data.fontColor.value,
					'--container-width': data.contentWidth.value,
					'--bg-color': data.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={onSubmit} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
