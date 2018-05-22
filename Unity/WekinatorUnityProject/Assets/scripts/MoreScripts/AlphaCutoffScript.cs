using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AlphaCutoffScript : MonoBehaviour {

	public float ScaleFrom, ScaleTo;

	private float animationTime;
	private float startTime;
	private bool animationRunning;

	private Renderer myRenderer;
	private Transform myTransform;

	// Use this for initialization
	void Start () {
		myRenderer = gameObject.GetComponent<Renderer>();
		myTransform = transform;

		animationRunning = false;
		myRenderer.enabled = false;
	}
	
	// Update is called once per frame
	void Update () {
		if (animationRunning == true)
		{
			float curDur = Time.time - startTime;
			float curFrac = curDur / animationTime;
			float curSize = Mathf.Lerp (ScaleFrom, ScaleTo, curFrac);

			myRenderer.material.SetFloat ("_Cutoff", Mathf.Lerp(1f, 0.02f, curFrac));
			myTransform.localScale = new Vector3 (curSize, curSize, 1);
		}
	}

	public void StartCircleAnimation(float timeForAnimation)
	{
		animationTime = timeForAnimation;
		startTime = Time.time;
		animationRunning = true;
		myRenderer.enabled = true;
	}

	public void StopCircleAnimation()
	{
		animationRunning = false;
		myRenderer.material.SetFloat ("_Cutoff", 1);
		myRenderer.enabled = false;
	}
}
