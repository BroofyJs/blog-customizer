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
	const [articleState, setArticleState] = useState(defaultArticleState);

	const onSubmit = (params: ArticleStateType) => {
		setArticleState(params);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={onSubmit} />
			<Article />
		</div>
	);
};
