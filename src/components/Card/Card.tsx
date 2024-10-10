import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { defaultValues } from '../../data/defaultValues.ts'
import { useEffect, useRef, useState } from 'react'
import styles from './Card.module.scss'

interface CardProps {
	name: string,
	number: string,
	month: string,
	year: string,
	cvc: string,
	currentFocusElemName: null | string
}

const Card = (
	{
		name, number, month, year, cvc, currentFocusElemName
	}: CardProps) => {
	const cardRef = useRef<HTMLElement>(null)
	const [focusFrontStyles, setFocusFrontStyles] = useState({})
	const [focusBackStyles, setFocusBackStyles] = useState({})
	const currentNumber = (
		number + defaultValues.number.slice(number.length)
	)
	const currentMonth = month + defaultValues.month.slice(month.length)
	const currentYear = year.slice(2) + defaultValues.year.slice(year.length)
	const currentCvc = cvc + defaultValues.cvc.slice(cvc.length)
	
	useEffect(() => {
		if (currentFocusElemName) {
			const elem: HTMLElement = cardRef
				.current
				?.querySelector(`label[for="${ currentFocusElemName }"]`)!
			
			if (currentFocusElemName === 'cvc') {
				setFocusBackStyles({
					width: `${ elem.offsetWidth }px`,
					height: `${ elem.offsetHeight }px`,
					transform: `translateX(${ elem.offsetLeft }px) translateY(${ elem.offsetTop }px)`
				})
				setFocusFrontStyles({zIndex: '-9'})
			} else {
				setFocusFrontStyles({
					width: `${ elem.offsetWidth }px`,
					height: `${ elem.offsetHeight }px`,
					transform: `translateX(${ elem.offsetLeft }px) translateY(${ elem.offsetTop }px)`
				})
				setFocusBackStyles({zIndex: '-9'})
			}
			
		} else {
			setFocusFrontStyles({zIndex: '-9'})
			setFocusBackStyles({zIndex: '-9'})
		}
		
	}, [currentFocusElemName])
	
	return (
		<section className={ styles.card } ref={ cardRef }>
			
			<div className={ styles.cardFront }>
				<div
					className={
						` ${ styles.itemFocus } ${
							currentFocusElemName && currentFocusElemName !== 'cvc' && styles.active
						} `
					}
					style={ focusFrontStyles }
				/>
				<label
					htmlFor="number"
					className={ styles.number }
				>
					{
						currentNumber.split('').map((num, i) => {
							return (
								<TransitionGroup
									component="span"
									className={ styles.numberColumn }
									key={ i }
								>
									<CSSTransition
										timeout={ 250 }
										classNames={ {
											enter: styles.slideFadeUpEnter,
											enterActive: styles.slideFadeUpEnterActive,
											exit: styles.slideFadeUpLeave,
											exitActive: styles.slideFadeUpLeaveActive,
										} }
										key={ i + num }
									>
										<span>{ num }</span>
									</CSSTransition>
								</TransitionGroup>
							)
						})
					}
				</label>
				<div className={ styles.frontBottom }>
					<label htmlFor="name" className={ styles.name }>
						<TransitionGroup
							className={ styles.nameRow }
						>
							{
								name.length === 0 ? (
									<CSSTransition
										timeout={ 250 }
										classNames={ {
											enter: styles.slideFadeUpEnter,
											enterActive: styles.slideFadeUpEnterActive,
											exit: styles.slideFadeUpLeave,
											exitActive: styles.slideFadeUpLeaveActive
										} }
										key={ 0 }
									>
										<span className={ styles.nameRowItems }>
											{ defaultValues.name }
										</span>
									</CSSTransition>
								) : (
									<CSSTransition
										timeout={ 250 }
										classNames={ {
											enter: styles.slideFadeUpEnter,
											enterActive: styles.slideFadeUpEnterActive,
											exit: styles.slideFadeUpLeave,
											exitActive: styles.slideFadeUpLeaveActive
										} }
										key={ 1 }
									>
										<TransitionGroup
											component="span"
											className={ styles.nameRowItems }
										>
											{ name.split('').map(
												(item, idx) => {
													return (
														<CSSTransition
															timeout={ 250 }
															classNames={ {
																enter: styles.slideFadeRightEnter,
																enterActive: styles.slideFadeRightEnterActive,
																exit: styles.slideFadeRightLeave,
																exitActive: styles.slideFadeRightLeaveActive
															} }
															key={ idx }
														>
															<span>{ item }</span>
														</CSSTransition>
													)
												}
											) }
										</TransitionGroup>
									</CSSTransition>
								)
							}
						</TransitionGroup>
					</label>
					<label htmlFor="month" className={ styles.date }>
						<label htmlFor="month">
							<TransitionGroup className={ styles.month }>
								<CSSTransition
									timeout={ 250 }
									classNames={ {
										enter: styles.slideFadeUpEnter,
										enterActive: styles.slideFadeUpEnterActive,
										exit: styles.slideFadeUpLeave,
										exitActive: styles.slideFadeUpLeaveActive
									} }
									key={ month }
								>
									<span>{ currentMonth }</span>
								</CSSTransition>
							</TransitionGroup>
						</label>
						<div>/</div>
						<label htmlFor="year">
							<TransitionGroup className={ styles.year }>
								<CSSTransition
									timeout={ 250 }
									classNames={ {
										enter: styles.slideFadeUpEnter,
										enterActive: styles.slideFadeUpEnterActive,
										exit: styles.slideFadeUpLeave,
										exitActive: styles.slideFadeUpLeaveActive
									} }
									key={ currentYear }
								>
									<span>{ currentYear }</span>
								</CSSTransition>
							</TransitionGroup>
						</label>
					</label>
				</div>
			</div>
			
			<div className={ styles.cardBack }>
				<div
					className={
						` ${ styles.itemFocus } ${
							currentFocusElemName && currentFocusElemName === 'cvc' && styles.active
						} `
					}
					style={ {...focusBackStyles, borderColor: 'rgba(0, 0, 0, .65)'} }
				/>
				<label htmlFor="cvc">
					{
						currentCvc.split('').map((item, i) => {
							return (
								<TransitionGroup
									component="span"
									className={ styles.cvc }
									key={ i }
								>
									<CSSTransition
										timeout={ 250 }
										classNames={ {
											enter: styles.slideOpacityEnter,
											enterActive: styles.slideOpacityEnterActive,
											exit: styles.slideOpacityLeave,
											exitActive: styles.slideOpacityLeaveActive
										} }
										key={ i + item }
									>
										<span>{ item }</span>
									</CSSTransition>
								</TransitionGroup>
							)
						})
					}
				</label>
			</div>
		</section>
	)
}

export default Card