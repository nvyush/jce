<?php

/**
 * @package   	JCE
 * @copyright 	Copyright (c) 2009-2015 Ryan Demmer. All rights reserved.
 * @license   	GNU/GPL 2 or later - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * JCE is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */

defined('_JEXEC') or die('RESTRICTED');
?>

  <div class="ui-form-row ui-grid ui-grid-small">
    <label for="positioning_type" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_POSITIONING_TYPE');?></label>
    <div class="ui-form-controls ui-width-3-10">
      <select id="positioning_type" class="mceEditableSelect"></select>
    </div>
    <label for="positioning_visibility" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_VISIBILITY');?></label>
    <div class="ui-form-controls ui-width-3-10">
      <select id="positioning_visibility" class="mceEditableSelect"></select>
    </div>
  </div>

  <div class="ui-form-row ui-grid ui-grid-small">
    <label for="positioning_width" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_WIDTH');?></label>
        <div class="ui-form-controls ui-width-2-10">
          <input type="number" id="positioning_width" onchange="StyleDialog.synch('positioning_width','box_width');" />
        </div>
        <div class="ui-form-controls ui-width-2-10">
          <select id="positioning_width_measurement" ></select>
        </div>
        <label for="positioning_zindex" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_ZINDEX');?></label>
        <div class="ui-form-controls ui-width-2-10">
          <input type="number" id="positioning_zindex" />
        </div>
  </div>

  <div class="ui-form-row ui-grid ui-grid-small">
    <label for="positioning_height" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_HEIGHT');?></label>
        <div class="ui-form-controls ui-width-2-10">
          <input type="number" id="positioning_height" onchange="StyleDialog.synch('positioning_height','box_height');" />
        </div>
        <div class="ui-form-controls ui-width-2-10">
          <select id="positioning_height_measurement" ></select>
        </div>
        <label for="positioning_overflow" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_OVERFLOW');?></label>
        <div class="ui-form-controls ui-width-2-10">
          <select id="positioning_overflow" class="mceEditableSelect"></select>
        </div>
  </div>

<div class="ui-grid ui-grid-small">
<div class="ui-width-5-10">
  <fieldset>
    <legend><?php echo WFText::_('WF_STYLES_PLACEMENT');?></legend>


      <div class="ui-form-row">
        <input type="checkbox" id="positioning_placement_same" checked="checked" onclick="StyleDialog.toggleSame(this,'positioning_placement');" />
        <label for="positioning_placement_same"><?php echo WFText::_('WF_STYLES_SAME');?></label>
      </div>
      <div class="ui-form-row ui-grid ui-grid-small">
        <label for="positioning_placement_left" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_TOP');?></label>


            <div class="ui-form-controls ui-width-4-10">
              <input type="number" id="positioning_placement_top" />
            </div>
            <div class="ui-form-controls ui-width-4-10">
              <select id="positioning_placement_top_measurement" ></select>
            </div>


      </div>
      <div class="ui-form-row ui-grid ui-grid-small">
        <label for="positioning_placement_left" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_RIGHT');?></label>


            <div class="ui-form-controls ui-width-4-10">
              <input type="number" id="positioning_placement_right" disabled="disabled" />
            </div>
            <div class="ui-form-controls ui-width-4-10">
              <select id="positioning_placement_right_measurement" disabled="disabled"></select>
            </div>


      </div>
      <div class="ui-form-row ui-grid ui-grid-small">
        <label for="positioning_placement_left" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_BOTTOM');?></label>


            <div class="ui-form-controls ui-width-4-10">
              <input type="number" id="positioning_placement_bottom" disabled="disabled" />
            </div>
            <div class="ui-form-controls ui-width-4-10">
              <select id="positioning_placement_bottom_measurement" disabled="disabled"></select>
            </div>


      </div>
      <div class="ui-form-row ui-grid ui-grid-small">
        <label for="positioning_placement_left" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_LEFT');?></label>


            <div class="ui-form-controls ui-width-4-10">
              <input type="number" id="positioning_placement_left" disabled="disabled" />
            </div>
            <div class="ui-form-controls ui-width-4-10">
              <select id="positioning_placement_left_measurement" disabled="disabled"></select>
            </div>


      </div>

  </fieldset>
</div>

<div class="ui-width-5-10">
  <fieldset>
    <legend><?php echo WFText::_('WF_STYLES_CLIP');?></legend>


      <div class="ui-form-row">
        <input type="checkbox" id="positioning_clip_same" checked="checked" onclick="StyleDialog.toggleSame(this,'positioning_clip');" />
        <label for="positioning_clip_same"><?php echo WFText::_('WF_STYLES_SAME');?></label>
      </div>
      <div class="ui-form-row ui-grid ui-grid-small">
        <label for="positioning_clip_top" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_TOP');?></label>


            <div class="ui-form-controls ui-width-4-10">
              <input type="number" id="positioning_clip_top" />
            </div>
            <div class="ui-form-controls ui-width-4-10">
              <select id="positioning_clip_top_measurement" ></select>
            </div>


      </div>
      <div class="ui-form-row ui-grid ui-grid-small">
        <label for="positioning_clip_right" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_RIGHT');?></label>


            <div class="ui-form-controls ui-width-4-10">
              <input type="number" id="positioning_clip_right" disabled="disabled" />
            </div>
            <div class="ui-form-controls ui-width-4-10">
              <select id="positioning_clip_right_measurement" disabled="disabled"></select>
            </div>


      </div>
      <div class="ui-form-row ui-grid ui-grid-small">
        <label for="positioning_clip_bottom" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_BOTTOM');?></label>


            <div class="ui-form-controls ui-width-4-10">
              <input type="number" id="positioning_clip_bottom" disabled="disabled" />
            </div>
            <div class="ui-form-controls ui-width-4-10">
              <select id="positioning_clip_bottom_measurement" disabled="disabled"></select>
            </div>


      </div>
      <div class="ui-form-row ui-grid ui-grid-small">
        <label for="positioning_clip_left" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_LEFT');?></label>

            <div class="ui-form-controls ui-width-4-10">
              <input type="number" id="positioning_clip_left" disabled="disabled" />
            </div>
            <div class="ui-form-controls ui-width-4-10">
              <select id="positioning_clip_left_measurement" disabled="disabled"></select>
            </div>


      </div>

  </fieldset>
</div>
</div>
