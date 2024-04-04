import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useCallback, useState, FormEvent, useEffect } from 'react';

export const ArticleParamsForm = ({
	onSubmit,
}: {
	onSubmit: (params: ArticleStateType) => void;
}) => {
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);

	const [isOpen, setIsOpen] = useState(false);

	const handleForm = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const getFormData = (): ArticleStateType => {
		return {
			backgroundColor,
			contentWidth,
			fontColor,
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
		};
	};

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				onSubmit(getFormData());
			}
		},
		[fontFamily, fontColor, backgroundColor, contentWidth, fontSize]
	);

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [onKeyDown]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		onSubmit(getFormData());
	};

	const handleReset = (e: FormEvent) => {
		e.preventDefault();

		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontSize(defaultArticleState.fontSizeOption);

		onSubmit(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} openForm={handleForm} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						Задайте парамерты
					</Text>
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(option) => setFontFamily(option)}
					/>
					<RadioGroup
						name='radioGroup'
						selected={fontSize}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={(option) => setFontSize(option)}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(option) => setFontColor(option)}
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(option) => setBackgroundColor(option)}
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(option) => setContentWidth(option)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
			<div
				onClick={() => setIsOpen(false)}
				className={clsx(styles.container_overlay, {
					[styles.overlay_open]: isOpen,
				})}
			/>
		</>
	);
};
