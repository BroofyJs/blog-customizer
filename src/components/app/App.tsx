import clsx from 'clsx';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';
import styles from './App.module.scss';
import { CSSProperties, useState } from 'react';

export const App = () => {
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
